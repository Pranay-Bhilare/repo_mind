import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogHeader } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import useProject from '@/hooks/use-project';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import React from 'react'

const AskQuestionCard = () => {
    const [question, setQuestion] = React.useState('')
    const {project} = useProject();
    const [open, setOpen] = React.useState(false);
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOpen(true)
    }
  return (
    <>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
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
             </DialogHeader>
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
                    <Button variant="sidebar" type='submit'>Ask RepoMind !</Button>
                </form>
            </CardContent>
        </Card>
    </>
  )
}

export default AskQuestionCard