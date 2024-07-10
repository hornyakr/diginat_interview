'use client'

import FormCard from "@/components/layout/FormCard";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { selectTitle, submitTitle } from "@/lib/features/blog/blogSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod"

const validationSchema = z.object({
    title: z.string()
        .min(2, 'A cím minimum hossza 2 karakter!')
})

export default function TitlePage() {
    const dispatch = useAppDispatch()
    const title = useAppSelector(selectTitle)

    const form = useForm<z.infer<typeof validationSchema>>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            title: title,
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue('title', e.target.value)
        dispatch(submitTitle(e.target.value))
        await form.trigger('title')
    }

    const cardHeader: React.ReactNode = (
        <div className="flex justify-end">
            <Link href={'/blog/body'}>
                <Button variant="outline" size="icon">
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </Link>
        </div>
    )

    const cardContent: React.ReactNode = (
        <Form {...form}>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cím</FormLabel>
                        <FormControl>
                            <Input {...field} onChange={handleChange} />
                        </FormControl>
                        <FormDescription>
                            Itt megadhatod a blog címét
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    )

    return (
        <FormCard header={cardHeader} content={cardContent} />
    )
}