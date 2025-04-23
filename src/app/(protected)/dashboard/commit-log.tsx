import React from 'react'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react';
import { cn } from '@/lib/utils';
import { ExternalLink, Link } from 'lucide-react';
const CommitLog  = () => {
  const { projectId,project }  = useProject();
  const  { data : commitLog } = api.project.getCommits.useQuery({ projectId} );
  return (
        <>
          <ul className="space-y-3">
            {commitLog?.map((commit, commitIdx) => {
              return (
                <li key={commit.id} className="relative flex items-start gap-x-3">
                  <div className={cn(commitIdx === commitLog.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-4 top-0 flex w-6 justify-center')}> 
                    <div className="w-px translate-x-1 bg-gray-200"></div>
                  </div>
                  <img src={commit.commitAuthorAvatar} alt={commit.commitAuthorName} className="relative mt-0.5 ml-0.5 w-16 h-16 max-w-[64px] max-h-[64px] flex-none rounded-full border border-gray-200 shadow-sm bg-gray-50 object-cover" />
                  <div className="flex-1 rounded-lg bg-white px-4 py-2 ring-1 ring-inset ring-gray-200">
                    <div className="flex items-center justify-between gap-x-2">
                      <a target="_blank" href={`${project?.githubUrl}/commit/${commit.commitHash}`} className="text-xs font-semibold text-gray-900 hover:underline flex items-center gap-1">
                        <span>{commit.commitAuthorName}</span>
                        <span className="inline-flex items-center text-gray-500 font-normal">
                          committed
                          <ExternalLink className="ml-1 size-3.5" />
                        </span>
                      </a>
                    </div>
                    <div className="mt-0.5 text-sm font-medium text-gray-800 leading-tight truncate">
                      {commit.commitMessage}
                    </div>
                    <pre className="mt-1 whitespace-pre-wrap text-xs leading-5 text-gray-500 bg-gray-50 rounded-md px-2 py-1 border border-gray-100">
                      {commit.summary}
                    </pre>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
  )
}

export default CommitLog