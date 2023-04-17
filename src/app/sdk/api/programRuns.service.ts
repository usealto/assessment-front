/**
 * Usealto API [DEV]
 * The usealto (also called alto) API swagger documentation
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { CreateProgramRunDtoApi } from '../model/createProgramRunDto';
// @ts-ignore
import { ProgramRunCreatedResponseApi } from '../model/programRunCreatedResponse';
// @ts-ignore
import { ProgramRunPaginatedResponseApi } from '../model/programRunPaginatedResponse';
// @ts-ignore
import { ProgramRunResponseApi } from '../model/programRunResponse';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


export interface CreateProgramRunRequestParams {
    createProgramRunDtoApi: CreateProgramRunDtoApi;
    /** The ID of the company that the user sending the request is related to.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication. */
    companyId?: string;
    /** The ID of the user sending the request.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication.  Used to set the &#x60;createdBy&#x60; property on creation of entities. */
    userId?: string;
}

export interface GetAllProgramRunQuestionsPaginatedRequestParams {
    id: string;
    createdBy?: string;
    /** The fields to sort by.  The Sort by allow to sort the results by specific properties, for example to sort the results by createdAt in scending order you can use the following syntaxt :  ?sortBy&#x3D;createdAt:asc  if you want to apply multiple sort you can do it by adding more sortBy options like this :  ?sortBy&#x3D;createdAt:asc,questionId:desc */
    sortBy?: string;
    /** An array of  IDs used to filter the results to only include entities with the specified IDs */
    ids?: string;
    /** An array of program IDs used to filter the results. If no program IDs are provided, all questions will be returned.  The filter applied is an &lt;b&gt;OR&lt;/b&gt;.  &lt;b&gt;The query will return questions that have AT LEAST one of the specified program ID.&lt;/b&gt; */
    programRunIds?: string;
    isDone?: boolean;
    /** The ID of the company that the user sending the request is related to.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication. */
    companyId?: string;
    /** The ID of the user sending the request.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication. */
    userId?: string;
    /** The page of results to retrieve. */
    page?: number;
    /** The number of items per page to retrieve. */
    itemsPerPage?: number;
    /** A date used to filter the results based on the createdAt field of the resources, only including resources created after this date. the operator used for this filter is  &gt;&#x3D; (greater than or equal to)  If the createdAfter field is provided with a date without a time, it will include resources created on the same day as the provided date, starting at midnight.  The format of the datetime should be ISO 8601 with timezone: YYYY-MM-DDTHH:mm:ss.sssZ.  Example: 2023-02-27T21:42:00.000Z. */
    createdAfter?: Date;
    /** A date used to filter the results based on the createdAt field of the resources, only including resources created before this date. the operator used for this filter is &lt;&#x3D; (less than or equal to)  If the createdBefore field is provided with a date without a time, it will include resources created on the same day as the provided date, ending at midnight.  The format of the datetime should be ISO 8601 with timezone: YYYY-MM-DDTHH:mm:ss.sssZ.  Example: 2023-02-27T21:42:00.000Z. */
    createdBefore?: Date;
}

export interface GetProgramRunByIdRequestParams {
    id: string;
    /** The ID of the company that the user sending the request is related to.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication. */
    companyId?: string;
    /** The ID of the user sending the request.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication.  Used to set the &#x60;createdBy&#x60; property on creation of entities. */
    userId?: string;
}

export interface GetProgramRunsRequestParams {
    createdBy?: string;
    /** The fields to sort by.  The Sort by allow to sort the results by specific properties, for example to sort the results by createdAt in scending order you can use the following syntaxt :  ?sortBy&#x3D;createdAt:asc  if you want to apply multiple sort you can do it by adding more sortBy options like this :  ?sortBy&#x3D;createdAt:asc,questionId:desc */
    sortBy?: string;
    /** An array of  IDs used to filter the results to only include entities with the specified IDs */
    ids?: string;
    /** An array of program IDs used to filter the results. If no program IDs are provided, all questions will be returned.  The filter applied is an &lt;b&gt;OR&lt;/b&gt;.  &lt;b&gt;The query will return questions that have AT LEAST one of the specified program ID.&lt;/b&gt; */
    programIds?: string;
    teamIds?: string;
    /** A date used to filter the results based on the finishedAt field of the resources, only including resources finished after this date. the operator used for this filter is  &gt;&#x3D; (greater than or equal to)  If the finishedAfter field is provided with a date without a time, it will include resources finished on the same day as the provided date, starting at midnight.  The format of the datetime should be ISO 8601 with timezone: YYYY-MM-DDTHH:mm:ss.sssZ.  Example: 2023-02-27T21:42:00.000Z. */
    finishedAfter?: Date;
    /** A date used to filter the results based on the finishedAt field of the resources, only including resources finished before this date. the operator used for this filter is &lt;&#x3D; (less than or equal to)  If the finishedBefore field is provided with a date without a time, it will include resources finished on the same day as the provided date, ending at midnight.  The format of the datetime should be ISO 8601 with timezone: YYYY-MM-DDTHH:mm:ss.sssZ.  Example: 2023-02-27T21:42:00.000Z. */
    finishedBefore?: Date;
    isFinished?: boolean;
    isValid?: boolean;
    /** The ID of the company that the user sending the request is related to.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication. */
    companyId?: string;
    /** The ID of the user sending the request.  This field is required when using the API Key.  It will be included in the JSON Web Token (JWT) when using Auth0 authentication. */
    userId?: string;
    /** The page of results to retrieve. */
    page?: number;
    /** The number of items per page to retrieve. */
    itemsPerPage?: number;
    /** A date used to filter the results based on the createdAt field of the resources, only including resources created after this date. the operator used for this filter is  &gt;&#x3D; (greater than or equal to)  If the createdAfter field is provided with a date without a time, it will include resources created on the same day as the provided date, starting at midnight.  The format of the datetime should be ISO 8601 with timezone: YYYY-MM-DDTHH:mm:ss.sssZ.  Example: 2023-02-27T21:42:00.000Z. */
    createdAfter?: Date;
    /** A date used to filter the results based on the createdAt field of the resources, only including resources created before this date. the operator used for this filter is &lt;&#x3D; (less than or equal to)  If the createdBefore field is provided with a date without a time, it will include resources created on the same day as the provided date, ending at midnight.  The format of the datetime should be ISO 8601 with timezone: YYYY-MM-DDTHH:mm:ss.sssZ.  Example: 2023-02-27T21:42:00.000Z. */
    createdBefore?: Date;
}


@Injectable({
  providedIn: 'root'
})
export class ProgramRunsApiService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * Create a new program run
     * This method handles POST requests to the \&#39;/programs\&#39; route to create a new program using the data passed in the body. It will respond with the newly created program.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createProgramRun(requestParameters: CreateProgramRunRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<ProgramRunCreatedResponseApi>;
    public createProgramRun(requestParameters: CreateProgramRunRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<ProgramRunCreatedResponseApi>>;
    public createProgramRun(requestParameters: CreateProgramRunRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<ProgramRunCreatedResponseApi>>;
    public createProgramRun(requestParameters: CreateProgramRunRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        const createProgramRunDtoApi = requestParameters.createProgramRunDtoApi;
        if (createProgramRunDtoApi === null || createProgramRunDtoApi === undefined) {
            throw new Error('Required parameter createProgramRunDtoApi was null or undefined when calling createProgramRun.');
        }
        const companyId = requestParameters.companyId;
        const userId = requestParameters.userId;

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (companyId !== undefined && companyId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>companyId, 'companyId');
        }
        if (userId !== undefined && userId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>userId, 'userId');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (x-api-key) required
        localVarCredential = this.configuration.lookupCredential('x-api-key');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('x-api-key', localVarCredential);
        }

        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v1/program-runs`;
        return this.httpClient.request<ProgramRunCreatedResponseApi>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: createProgramRunDtoApi,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Programs with filter, sort and pagination options
     * This method handles GET requests to the \&#39;/programs\&#39; route with the filter, sort and pagination options passed in the query parameters it will respond with the paginated programs along with the current state of pagination .
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAllProgramRunQuestionsPaginated(requestParameters: GetAllProgramRunQuestionsPaginatedRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<ProgramRunPaginatedResponseApi>;
    public getAllProgramRunQuestionsPaginated(requestParameters: GetAllProgramRunQuestionsPaginatedRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<ProgramRunPaginatedResponseApi>>;
    public getAllProgramRunQuestionsPaginated(requestParameters: GetAllProgramRunQuestionsPaginatedRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<ProgramRunPaginatedResponseApi>>;
    public getAllProgramRunQuestionsPaginated(requestParameters: GetAllProgramRunQuestionsPaginatedRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getAllProgramRunQuestionsPaginated.');
        }
        const createdBy = requestParameters.createdBy;
        const sortBy = requestParameters.sortBy;
        const ids = requestParameters.ids;
        const programRunIds = requestParameters.programRunIds;
        const isDone = requestParameters.isDone;
        const companyId = requestParameters.companyId;
        const userId = requestParameters.userId;
        const page = requestParameters.page;
        const itemsPerPage = requestParameters.itemsPerPage;
        const createdAfter = requestParameters.createdAfter;
        const createdBefore = requestParameters.createdBefore;

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (createdBy !== undefined && createdBy !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdBy, 'createdBy');
        }
        if (sortBy !== undefined && sortBy !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>sortBy, 'sortBy');
        }
        if (ids !== undefined && ids !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>ids, 'ids');
        }
        if (programRunIds !== undefined && programRunIds !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>programRunIds, 'programRunIds');
        }
        if (isDone !== undefined && isDone !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>isDone, 'isDone');
        }
        if (companyId !== undefined && companyId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>companyId, 'companyId');
        }
        if (userId !== undefined && userId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>userId, 'userId');
        }
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (itemsPerPage !== undefined && itemsPerPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>itemsPerPage, 'itemsPerPage');
        }
        if (createdAfter !== undefined && createdAfter !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdAfter, 'createdAfter');
        }
        if (createdBefore !== undefined && createdBefore !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdBefore, 'createdBefore');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (x-api-key) required
        localVarCredential = this.configuration.lookupCredential('x-api-key');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('x-api-key', localVarCredential);
        }

        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v1/program-runs/${this.configuration.encodeParam({name: "id", value: id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/questions`;
        return this.httpClient.request<ProgramRunPaginatedResponseApi>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a single program by ID
     * This method handles GET requests to the \&#39;/programs/{:id}\&#39; route with &#x60;{:id}&#x60; the id of the program we want to find. If the program exists it will return it, if not we respond with an error not found.
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProgramRunById(requestParameters: GetProgramRunByIdRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<ProgramRunResponseApi>;
    public getProgramRunById(requestParameters: GetProgramRunByIdRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<ProgramRunResponseApi>>;
    public getProgramRunById(requestParameters: GetProgramRunByIdRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<ProgramRunResponseApi>>;
    public getProgramRunById(requestParameters: GetProgramRunByIdRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getProgramRunById.');
        }
        const companyId = requestParameters.companyId;
        const userId = requestParameters.userId;

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (companyId !== undefined && companyId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>companyId, 'companyId');
        }
        if (userId !== undefined && userId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>userId, 'userId');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (x-api-key) required
        localVarCredential = this.configuration.lookupCredential('x-api-key');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('x-api-key', localVarCredential);
        }

        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v1/program-runs/${this.configuration.encodeParam({name: "id", value: id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}`;
        return this.httpClient.request<ProgramRunResponseApi>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get Programs with filter, sort and pagination options
     * This method handles GET requests to the \&#39;/programs\&#39; route with the filter, sort and pagination options passed in the query parameters it will respond with the paginated programs along with the current state of pagination .
     * @param requestParameters
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProgramRuns(requestParameters: GetProgramRunsRequestParams, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<ProgramRunPaginatedResponseApi>;
    public getProgramRuns(requestParameters: GetProgramRunsRequestParams, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<ProgramRunPaginatedResponseApi>>;
    public getProgramRuns(requestParameters: GetProgramRunsRequestParams, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<ProgramRunPaginatedResponseApi>>;
    public getProgramRuns(requestParameters: GetProgramRunsRequestParams, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        const createdBy = requestParameters.createdBy;
        const sortBy = requestParameters.sortBy;
        const ids = requestParameters.ids;
        const programIds = requestParameters.programIds;
        const teamIds = requestParameters.teamIds;
        const finishedAfter = requestParameters.finishedAfter;
        const finishedBefore = requestParameters.finishedBefore;
        const isFinished = requestParameters.isFinished;
        const isValid = requestParameters.isValid;
        const companyId = requestParameters.companyId;
        const userId = requestParameters.userId;
        const page = requestParameters.page;
        const itemsPerPage = requestParameters.itemsPerPage;
        const createdAfter = requestParameters.createdAfter;
        const createdBefore = requestParameters.createdBefore;

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (createdBy !== undefined && createdBy !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdBy, 'createdBy');
        }
        if (sortBy !== undefined && sortBy !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>sortBy, 'sortBy');
        }
        if (ids !== undefined && ids !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>ids, 'ids');
        }
        if (programIds !== undefined && programIds !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>programIds, 'programIds');
        }
        if (teamIds !== undefined && teamIds !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>teamIds, 'teamIds');
        }
        if (finishedAfter !== undefined && finishedAfter !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>finishedAfter, 'finishedAfter');
        }
        if (finishedBefore !== undefined && finishedBefore !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>finishedBefore, 'finishedBefore');
        }
        if (isFinished !== undefined && isFinished !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>isFinished, 'isFinished');
        }
        if (isValid !== undefined && isValid !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>isValid, 'isValid');
        }
        if (companyId !== undefined && companyId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>companyId, 'companyId');
        }
        if (userId !== undefined && userId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>userId, 'userId');
        }
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (itemsPerPage !== undefined && itemsPerPage !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>itemsPerPage, 'itemsPerPage');
        }
        if (createdAfter !== undefined && createdAfter !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdAfter, 'createdAfter');
        }
        if (createdBefore !== undefined && createdBefore !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>createdBefore, 'createdBefore');
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (x-api-key) required
        localVarCredential = this.configuration.lookupCredential('x-api-key');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('x-api-key', localVarCredential);
        }

        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v1/program-runs`;
        return this.httpClient.request<ProgramRunPaginatedResponseApi>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
