"use client"

import useProject from "@/hooks/use-project"
import { api } from "@/trpc/react"
import { motion } from "framer-motion"
import AskQuestionCard from "../dashboard/ask-question-card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import React from "react"
import MDEditor from "@uiw/react-md-editor"
import CodeReferences from "../dashboard/code-references"

export default function QAPage() {
  const {projectId} = useProject()
  const {data : questions}  = api.project.getQuestions.useQuery({ projectId: projectId })
  const [questionIndex, setQuestionIndex] = React.useState(0)
  const question = questions?.[questionIndex]
  return (
    <div style={{ fontSize: '0.875rem' }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-bold mb-0.5 ">Q&A Assistant</h1>
        <h2 className="text-sm mb-3 text-muted-foreground font-normal">Get answers to your questions instantly</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <Sheet>
          <AskQuestionCard/>
          <div className="text-lg font-semibold">Saved Questions</div>
          <div className="flex flex-col gap-1.5">
            {questions?.map((question,index) => {
                return <React.Fragment key={question.id}>
                  <SheetTrigger onClick ={()=> {setQuestionIndex(index)}}>
                    <div className="flex items-center gap-3 bg-white rounded-md p-2 shadow border">
                      <img className="rounded-full" height={24} width={24} src={question.user.imageUrl ?? ""} />
                      <div className="text-left flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="text-gray-700 line-clamp-1 text-base font-medium">
                            {question.question}
                          </p>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {question.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-500 line-clamp-1 text-xs">
                          {question.answer}
                        </p>
                      </div>
                    </div>
                  </SheetTrigger>
                </React.Fragment>
            })}
          </div>
          {question && (
            <SheetContent className="sm:max-w-[80vw]">
              <SheetHeader>
                <SheetTitle>
                  {question.question}
                </SheetTitle>
                <div className="max-w-[80vw] max-h-[43vh] overflow-auto rounded-lg bg-white/95 p-4 shadow-inner border border-slate-200 text-slate-800 prose prose-slate dark:prose-invert dark:bg-slate-900/90 dark:text-slate-100">
                <MDEditor.Markdown source={question.answer} className="!bg-transparent !text-inherit !shadow-none !border-none"/>
                </div>
                {/* <CodeReferences fileReferred={question.filesReferred ?? []} /> */}
              </SheetHeader>
            </SheetContent>
          )}
       </Sheet>
      </motion.div>
    </div>
  )
}
