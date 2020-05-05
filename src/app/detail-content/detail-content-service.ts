import { Injectable } from '@angular/core';
import { SingleRepoContent } from '../shared/models/single-repo-content.model';
import { OwnerInfo } from '../shared/models/owner-info.model';
import { RepoOverview } from '../shared/models/repo-overview.model';
import { RepoInfo } from '../shared/models/repo-info.model';
import { Commit } from '../shared/models/commit-model';

export interface TrendingGraphInfo {
    endOfWeeks: string[];
    historicalCommitCounts: number[];
    gaps: number[];
    predictCommitCounts: number[];
}

@Injectable({
    providedIn: 'root'
})
export class DetailContentService {

    private _singleRepoContent: SingleRepoContent;
    private _repoOverview: RepoOverview;
    private _ownerInfo: OwnerInfo;
    private _repoInfo: RepoInfo;
    private _commits: Commit[];
    private _trendingGraphInfo: TrendingGraphInfo;

    constructor() {}

    set singleRepoContent(singleRepoContent: SingleRepoContent) {
        this._singleRepoContent = { ... singleRepoContent };

        const repoOverview: RepoOverview = {
            platformIconImg: singleRepoContent.platform_icon_img,
            platformIconImgAlt: singleRepoContent.platform_icon_img_alt,
            repoName: singleRepoContent.repoName,
            createdAt: singleRepoContent.created_at, 
            description: singleRepoContent.description,
            webURL: singleRepoContent.web_url
        };

        this._repoOverview = repoOverview;

        const unknowImg = 'assets/unknown-avatar.jpg';
        
        const ownerInfo: OwnerInfo = {
            avatarURL: singleRepoContent.avatar_url ? singleRepoContent.avatar_url : unknowImg,
            ownerName: singleRepoContent.owner_name,
            profileURL: singleRepoContent.profile_url
        };
        
        this._ownerInfo = ownerInfo;
        
        const repoInfo: RepoInfo = {
            starCount: singleRepoContent.star_count,
            forkCount: singleRepoContent.fork_count,
            size: singleRepoContent.size,
            updatedAt: singleRepoContent.updated_at,
            language: singleRepoContent.language
        };

        this._repoInfo = repoInfo;

        this._commits = singleRepoContent.commits;

        const trendingGraphInfo = this.setTrendingGraphInfo(this._commits);

        this._trendingGraphInfo = trendingGraphInfo;
    }

    get singleRepoContent(): SingleRepoContent {
        return { ... this._singleRepoContent };
    }

    set repoOverview(repoOverview: RepoOverview) {
        this._repoOverview = repoOverview;
    }

    get repoOverview() {
        return { ... this._repoOverview };
    }

    set ownerInfo(ownerInfo: OwnerInfo) {
        this._ownerInfo = ownerInfo;
    }
    get ownerInfo() {
        return { ... this._ownerInfo };
    }
    set repoInfo(repoInfo: RepoInfo) {
        this._repoInfo = repoInfo;
    }

    get repoInfo() {
        return { ... this._repoInfo };
    }
    
    set commits(commits: Commit[]) {
        this._commits = commits;
    }

    get commits() {
        return this._commits;
    }

    set trendingGraphInfo(trendingGraphInfo: TrendingGraphInfo) {
        this._trendingGraphInfo = trendingGraphInfo;
    }

    get trendingGraphInfo() {
        return this._trendingGraphInfo;
    }

    setTrendingGraphInfo(commits: Commit[]) {
        const today = new Date();
        const endOfWeeks: string[] = [];
        const historicalCommitCounts: number[] = [];
        const predictCommitCounts: number[] = [];
        const gaps: number[] = [];  
        if (commits) {
            
            let prevEnfOfWeek: Date;
            let prevIndex: number;
            let prevCommitCount: number;
            
            commits.forEach((commit, index) => {
                const endOfWeek = commit.endOfWeek;
                const endOfWeekDate = new Date(`${ endOfWeek } 23:59`);
                const commitCount = commit.numCommits;
                
                if (endOfWeekDate <= today) {

                    if (prevEnfOfWeek >= today) {
                        gaps[0] = prevCommitCount;
                        gaps.unshift(commitCount);
                    } else {
                        gaps.unshift(NaN);
                    }
                    historicalCommitCounts.unshift(commitCount);
                    predictCommitCounts.unshift(NaN);
                    
                } else {

                    historicalCommitCounts.unshift(NaN);
                    gaps.unshift(NaN);
                    predictCommitCounts.unshift(commitCount);
                }
                  
                prevEnfOfWeek = endOfWeekDate;
                prevCommitCount = commitCount;
                endOfWeeks.unshift(endOfWeek);
            })
        }


        return { 
            endOfWeeks: endOfWeeks,
            historicalCommitCounts: historicalCommitCounts,
            gaps: gaps,
            predictCommitCounts: predictCommitCounts 
        };
    }

}
