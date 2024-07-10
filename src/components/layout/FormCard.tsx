import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
    header: React.ReactNode,
    content: React.ReactNode,
    footer?: React.ReactNode | null,
}

export default function FormCard({ footer, header, content }: Props) {
    return (
        <Card>
            <CardHeader>
                {header}
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            {footer && (
                <CardFooter>
                    {footer}
                </CardFooter>
            )}
        </Card>
    )
}