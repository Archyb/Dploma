import React from "react";
import {Container, Typography} from "@mui/material";


interface props {
    title: string | undefined,
    description: string | undefined,
    children?: React.ReactNode,
    backgroundColor?: string,
}

const formLayout = (props: props) => {
    const {children, title, description, backgroundColor} = props
    return (
        <Container sx={{
            maxWidth:'100%',
            display:"block",
        }}>
            <Typography variant={"h2"} align={"left"}>{title}</Typography>
            <Typography align={"left"}>{description}</Typography>
            {children}
        </Container>
    )
}

export default formLayout
