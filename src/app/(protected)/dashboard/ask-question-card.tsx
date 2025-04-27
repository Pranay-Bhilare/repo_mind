import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogHeader } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useProject from '@/hooks/use-project';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import React from 'react'
import { askQuestion } from './action';
import { readStreamableValue } from 'ai/rsc';
import MDEditor from '@uiw/react-md-editor';
import CodeReferences from './code-references';
import { api } from '@/trpc/react';
import { toast } from 'sonner';
const AskQuestionCard = () => {
    const [question, setQuestion] = React.useState('')
    const {project} = useProject();
    const [open, setOpen] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const [fileReferred,setFileReferred] = React.useState<{fileName : string; sourceCode : string; summary: string}[]>()
    const [answer, setAnswer] = React.useState('');
    const saveAnswer = api.project.saveAnswers.useMutation()
    const onSubmit = async (e: React.FormEvent) => {
        setAnswer('')
        setFileReferred([])
        e.preventDefault();
        if(!project?.id) return;
        setLoading(true)

        const { output, fileReferred } = await askQuestion(question,project.id)
        setOpen(true)
        setFileReferred(fileReferred)

        for await (const chunks of readStreamableValue(output)){
          if(chunks){
            setAnswer(answer => answer + chunks)
          }
        }
        setLoading(false)
    }
  return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[80vw]'>
            <DialogHeader>
              <div className='flex items-center gap-2'>
              <DialogTitle>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-770 animate-pulse-glow">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                        <path d="M2 17L12 22L22 17" fill="currentColor" />
                        <path d="M2 12L12 17L22 12" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </DialogTitle>
                <Button variant={'sidebar'} type='button' disabled = {saveAnswer.isPending} onClick={()=> {
                  saveAnswer.mutate({
                    projectId: project!.id,
                    question,
                    answer,
                    filesReferred: fileReferred || []
                  }, {
                    onSuccess: () => {
                      toast.success('Answer Saved')
                    },
                    onError: () => {
                      toast.error('Failed to save answer !')
                    }
                  })
                }} > Save Answer</Button>
              </div>
             </DialogHeader>
            <div className="max-w-[80vw] max-h-[40vh] overflow-auto rounded-lg bg-white/95 p-4 shadow-inner border border-slate-200 text-slate-800 prose prose-slate dark:prose-invert dark:bg-slate-900/90 dark:text-slate-100">
              <MDEditor.Markdown source={answer} className="!bg-transparent !text-inherit !shadow-none !border-none" />
            </div>
            <CodeReferences fileReferred={fileReferred || []}/>
            <Button variant='sidebar' type='button' onClick={() => {setOpen(false)}}>
            Close
            </Button>
          

            </DialogContent>
        </Dialog>
        <Card className='relative w-3/5'>
            <CardHeader>
                <CardTitle>
                    Ask a question
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <Textarea placeholder="Ask a question about the project..." value = {question} onChange={e => setQuestion(e.target.value)}></Textarea>
                    <div className='h-4'></div>
                    <Button variant="sidebar" type='submit' disabled={loading}>Ask RepoMind</Button>
                </form>
            </CardContent>
        </Card>
    </>
  )
}

export default AskQuestionCard