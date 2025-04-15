"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowRight, Code, FileText, ImageIcon, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { api } from "@/trpc/react"
import { toast } from "sonner"
type FormInput = {
  repoURL: string,
  projectName: string,
  githubToken: string
}

export default function CreateProjectPage() {
  const {register,handleSubmit,reset}= useForm<FormInput>()
  const createProject = api.project.createProject.useMutation();
  function onSubmit(data: FormInput) {
    createProject.mutate({
      name : data.projectName,
      githubUrl : data.repoURL,
      githubToken : data.githubToken
    },{
      onSuccess : () => { 
        toast.success('Project Created Successfully !!')
        reset();
      },
      onError : () => { 
        toast.error('Failed to create project')
      }
    }
    )
    return true;
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <h1 className="text-3xl font-bold mb-2 gradient-text">Create Project</h1>
      <p className="text-muted-foreground mb-8">Link you repository with RepoMind</p>

      <Tabs defaultValue="blank" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger
            value="blank"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <FileText className="mr-2 h-4 w-4" />
            Blank
          </TabsTrigger>
          <TabsTrigger
            value="template"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Template
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Code className="mr-2 h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger
            value="design"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Design
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blank" className="mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>Fill in the details to create your new project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <Input
                    {...register("projectName", {required : true})}
                    placeholder="Enter project name"
                    className="transition-all duration-300 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div className="h-2"></div>
                <div className="space-y-2">
                  <Input
                    {...register("repoURL", {required : true})}
                    placeholder="Enter you github URL"
                    type="url"
                    className="transition-all duration-300 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
                <div className="h-2"></div>
                <div className="space-y-2">
                  <Input
                    {...register("githubToken")}
                    placeholder="For importing private repo's.. (optional)"
                    className="transition-all duration-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="h-4"></div>
                <Button variant="sidebar" type="submit">
                  Create Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="template">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="card-hover border-primary/10 cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Template {i}</CardTitle>
                  <CardDescription>Project template description</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-primary/60" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="sidebar" className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-hover border-primary/10 cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Frontend Template</CardTitle>
                <CardDescription>React + Next.js starter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                  <Code className="text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="sidebar" className="w-full">
                  Use Template
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover border-primary/10 cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Backend Template</CardTitle>
                <CardDescription>Node.js API starter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                  <Code className="text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="sidebar" className="w-full">
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="design">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-hover border-primary/10 cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">UI Design Kit</CardTitle>
                <CardDescription>Complete UI component library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="sidebar" className="w-full">
                  Use Template
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover border-primary/10 cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Brand Kit</CardTitle>
                <CardDescription>Brand identity starter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                  <ImageIcon className="text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="sidebar" className="w-full">
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
