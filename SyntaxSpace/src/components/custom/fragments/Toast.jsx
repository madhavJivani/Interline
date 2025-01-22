import React from 'react'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'

const Toast = ({
    title = "Title",
    description = "Hello SyntaxSpacer",
    actionLabel = "Action",
    actionOnClick = () => console.log("Action Clicked"),
    buttonTitle = "Show Toast"
}) => {
    return (
        <Button
            onClick={() =>
                toast(title, {
                    description: description,
                    action: {
                        label: actionLabel,
                        onClick: () => actionOnClick(),
                    },
                })
            }
        >{buttonTitle}
        </Button>
    )
}

export default Toast