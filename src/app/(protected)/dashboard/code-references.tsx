'use client'
import { Tabs , TabsContent} from '@/components/ui/tabs';
import React from 'react'
import { cn } from '@/lib/utils';
import {lucario} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

type Props = {
    fileReferred: {fileName : string; sourceCode : string; summary: string}[]
}
const CodeReferences = ({ fileReferred }:Props) => {
    const [tab,setTab] = React.useState(fileReferred[0]?.fileName)
  return (
    <div className='max-w-[70vw]'>
        <Tabs value={tab} onValueChange={setTab}>
            <div className="overflow-scroll flex gap-2 bg-gray-200 p-1 rounded-md">
                {fileReferred.map(file => (
                    <button
                        key={file.fileName}
                        className={cn(
                            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground hover-:bg-mute',
                            {
                                'bg-primary text-primary-foreground' : tab===file.fileName,
                            }
                        )}>
                        {file.fileName}
                    </button>
                ))}
            </div>
            
        </Tabs>
        {fileReferred.map(file => (
            <TabsContent key={file.fileName} value={file.fileName} className = "max-h-[40vh] overflow-scroll max-w-7xl rounded-m">
                <SyntaxHighlighter language="typescript" style={{lucario}}>
                    {file.sourceCode}
                </SyntaxHighlighter>
            </TabsContent>
        ))}
    </div>
  )
}

export default CodeReferences