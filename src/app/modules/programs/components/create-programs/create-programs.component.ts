import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PriorityEnumApi, ProgramDtoApi, QuestionDtoApi, TeamApi } from '@usealto/sdk-ts-angular';
import { Observable, combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
import { IFormBuilder, IFormGroup } from 'src/app/core/form-types';
import { EmojiName } from 'src/app/core/utils/emoji/data';
import { I18ns } from 'src/app/core/utils/i18n/I18n';
import { TeamStore } from 'src/app/modules/lead-team/team.store';
import { ReplaceInTranslationPipe } from '../../../../core/utils/i18n/replace-in-translation.pipe';
import { DeleteModalComponent } from '../../../shared/components/delete-modal/delete-modal.component';
import { ProgramForm } from '../../models/programs.form';
import { QuestionDisplay } from '../../models/question.model';
import { ProgramsStore } from '../../programs.store';
import { ProgramsRestService } from '../../services/programs-rest.service';
import { QuestionsRestService } from '../../services/questions-rest.service';
import { QuestionFormComponent } from '../questions/question-form/question-form.component';

@UntilDestroy()
@Component({
  selector: 'alto-create-programs',
  templateUrl: './create-programs.component.html',
  styleUrls: ['./create-programs.component.scss'],
  providers: [ReplaceInTranslationPipe],
})
export class CreateProgramsComponent implements OnInit {
  I18ns = I18ns;
  EmojiName = EmojiName;
  private fb: IFormBuilder;

  programForm!: IFormGroup<ProgramForm>;
  currentStep = 1;
  editedProgram?: ProgramDtoApi;
  isEdit = false;

  questions!: QuestionDtoApi[];
  questionsDisplay: QuestionDisplay[] = [];
  questionList: { id: string; delete: boolean }[] = [];
  questionPage = 1;
  questionPageSize = 10;
  questionsCount = 0;

  selectedTags: string[] = [];
  questionSearch = '';

  constructor(
    readonly fob: UntypedFormBuilder,
    private readonly offcanvasService: NgbOffcanvas,
    private readonly programRestService: ProgramsRestService,
    private readonly questionRestService: QuestionsRestService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    public programStore: ProgramsStore,
    public teamStore: TeamStore,
    private modalService: NgbModal,
    private replaceInTranslationPipe: ReplaceInTranslationPipe,
  ) {
    this.fb = fob;
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((p) => {
          if (p['id'] === 'new') {
            this.initForm();
            return null;
          } else {
            this.isEdit = true;
            return p['id'];
          }
        }),
        filter((x) => !!x),
        switchMap((id) => this.programRestService.getProgram(id)),
        tap((p) => {
          this.editedProgram = p;
        }),
        tap((p) => this.initForm(p)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  initForm(program?: ProgramDtoApi) {
    this.programForm = this.fb.group<ProgramForm>({
      name: [program?.name ?? '', [Validators.required]],
      priority: [program?.priority ?? null, [Validators.required]],
      description: program?.description ?? '',
      expectation: [program?.expectation ?? 70, [Validators.required]],
      tags: [[]],
      teams: [program?.teams?.map((t) => t.id) ?? []],
    });
  }

  saveProgram() {
    if (this.programForm.value) {
      const { teams, priority, ...rest } = this.programForm.value;

      delete rest['tags'];

      const progValues = {
        ...rest,
        priority: priority as string as PriorityEnumApi,
        teams: teams.map((id) => ({ id } as TeamApi)),
      };

      let obs$: Observable<any>;

      if (this.isEdit && this.editedProgram) {
        obs$ = !this.programForm.touched
          ? of(null)
          : this.programRestService.updateProgram(this.editedProgram.id, progValues);
      } else {
        obs$ = this.programRestService.createProgram(progValues);
      }
      let progId = '';
      obs$
        .pipe(
          filter((x) => !!x),
          map((d) => d.data),
          map((prog: ProgramDtoApi) => {
            progId = prog.id;
            if (!this.isEdit) {
              // add questionList to the program
              return this.questionList.map((q) =>
                this.programRestService.addOrRemoveQuestion(prog.id, q.id, false),
              );
            } else {
              return of(null);
            }
          }),
          switchMap((obs) => combineLatest(obs ?? [])),
          tap(() => {
            this.isEdit = true;
          }),
          switchMap(() => this.programRestService.getProgram(progId)),
          tap((prog) => {
            this.editedProgram = prog;
            this.programStore.programs.value = [];
          }),
          untilDestroyed(this),
        )
        .subscribe();
    }
  }

  openQuestionForm(question?: QuestionDisplay) {
    let isQuestionEdit = false;
    const canvasRef = this.offcanvasService.open(QuestionFormComponent, {
      position: 'end',
      panelClass: 'overflow-auto',
    });
    if (question) {
      canvasRef.componentInstance.question = this.questions.find((q) => q.id === question?.id);
      isQuestionEdit = true;
    }
    if (this.isEdit && this.editedProgram) {
      canvasRef.componentInstance.program = this.editedProgram;
    }
    canvasRef.componentInstance.createdQuestion
      .pipe(
        tap((newQuestion: QuestionDtoApi) => {
          //if it's a new question, add it to the list
          if (!isQuestionEdit) {
            this.questionList = this.questionList.filter((q) => q.id !== newQuestion.id);
            this.questionList.push({ id: newQuestion.id, delete: false });
          }

          // refresh the program
          this.refreshProgram();

          // refresh the questions list
          this.getQuestions();
        }),
      )
      .subscribe();
  }

  getQuestions() {
    this.questionRestService
      .getQuestionsPaginated({
        tagIds: this.selectedTags.join(','),
        sortByProgramId: this.editedProgram?.id ?? undefined,
        itemsPerPage: this.questionPageSize,
        page: this.questionPage,
        search: this.questionSearch,
      })
      .pipe(
        tap((questions) => {
          const { data = [], meta } = questions;
          this.questions = data;
          this.setquestionsDisplay(this.mapQuestionsToDisplay(data));
          this.questionsCount = meta.totalItems;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  changeTab(num: number) {
    this.currentStep = num;
    if (this.currentStep === 2) {
      this.selectedTags = this.programForm.value?.tags ?? [];
      this.getQuestions();
    }
  }

  goNext() {
    if (this.isEdit) {
      this.saveProgram();
    }
    this.currentStep++;
    if (this.currentStep === 2) {
      this.selectedTags = this.programForm.value?.tags ?? [];
      this.getQuestions();
    } else if (this.currentStep === 3) {
      this.saveProgram();
    }
  }

  searchQuestions(value: string) {
    this.questionSearch = value;
    this.getQuestions();
  }

  questionPageChange(e: any) {
    this.getQuestions();
  }

  setquestionsDisplay(quest: QuestionDisplay[]) {
    this.questionsDisplay = quest.sort((a, b) => (a.isChecked ? -1 : 1));
  }

  addOrRemoveQuestion(questionId: string, toDelete: any) {
    if (this.isEdit && this.editedProgram) {
      this.programRestService
        .addOrRemoveQuestion(this.editedProgram.id, questionId, toDelete)
        .pipe(
          tap(() => {
            this.getQuestions();
            this.refreshProgram();
          }),
          untilDestroyed(this),
        )
        .subscribe();
    } else {
      this.questionList = this.questionList.filter((q) => q.id !== questionId);
      if (!toDelete) {
        this.questionList.push({ id: questionId, delete: toDelete });
      }
    }
  }

  delete() {
    if (!this.editedProgram) {
      return;
    }
    const { id, name, teams } = this.editedProgram;

    const modalRef = this.modalService.open(DeleteModalComponent, { centered: true, size: 'md' });

    const componentInstance = modalRef.componentInstance as DeleteModalComponent;
    componentInstance.data = {
      title: this.replaceInTranslationPipe.transform(I18ns.programs.delete.title, name),
      subtitle: this.replaceInTranslationPipe.transform(
        I18ns.programs.delete.subtitle,
        teams.length.toString(),
      ),
    };

    componentInstance.objectDeleted
      .pipe(
        switchMap(() => this.programRestService.deleteProgram(id)),
        tap(() => {
          this.programRestService.resetCache();
          modalRef.close();
          this.location.back();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  cancel() {
    this.location.back();
  }

  copyToClipBoard() {
    navigator.clipboard.writeText(window.location.href);
  }

  mapQuestionsToDisplay(questions: QuestionDtoApi[]): QuestionDisplay[] {
    return questions.map((q) => ({
      id: q.id,
      title: q.title,
      isChecked:
        (this.questionList.some((question) => question.id === q.id && !question.delete) ||
          (this.isEdit && this.editedProgram
            ? q.programs?.some((p) => p.id === this.editedProgram?.id)
            : false)) ??
        false,
    }));
  }

  findTagName(id: string) {
    return this.programStore.tags.value.find((t) => t.id === id)?.name;
  }

  findTeamName(id: string) {
    return this.teamStore.teams.value.find((t) => t.id === id)?.shortName;
  }

  refreshProgram() {
    if (this.editedProgram) {
      this.programRestService.getProgram(this.editedProgram.id).subscribe((p) => {
        this.editedProgram = p;
      });
    }
  }
}
