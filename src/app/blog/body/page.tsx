'use client'

import FormCard from "@/components/layout/FormCard";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { posting, selectBody, selectTitle, submitBody, selectStatus } from "@/lib/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, RotateCcw } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const validationSchema = z.object({
    body: z.string()
        .min(5, 'A blog minimum hossza 5 karakter!')
})

export default function BodyPage() {
    const dispatch = useAppDispatch()
    const title = useAppSelector(selectTitle)
    const body = useAppSelector(selectBody)
    const status = useAppSelector(selectStatus)

    const form = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            body: body,
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue('body', e.target.value)
        dispatch(submitBody(e.target.value))
        await form.trigger('body')
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(posting({ title, body }))
    }

    const cardHeader: React.ReactNode = (
        <div className="flex justify-start">
            <Link href={'/blog/title'}>
                <Button variant="outline" size="icon">
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    )

    const cardContent: React.ReactNode = (
        <Form {...form}>
            <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Blog szöveg</FormLabel>
                        <FormControl>
                            <Input {...field} onChange={handleChange} />
                        </FormControl>
                        <FormDescription>
                            Itt megadhatod a blog szövegét
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    )

    const cardFooter: React.ReactNode = status === 'loading' ?
        (
            <Button disabled className="w-full">
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Küldés...
            </Button>
        ) : (
            <Button className="bg-green-600 border border-green-900 hover:bg-green-500 hover:border-green-700 w-full" onClick={handleSubmit}>
                Feltöltés
            </Button>
        )

    return (
        <FormCard header={cardHeader} content={cardContent} footer={cardFooter} />
    )
}