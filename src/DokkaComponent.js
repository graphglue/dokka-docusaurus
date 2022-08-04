import React, { useEffect, useRef } from "react"
import SetupHelper from "./SetupHelper";
import styleStyle from "./styles/style.js"
import mainStyle from "./styles/main.js"
import prismStyle from "./styles/prism.js"
import root from "react-shadow"
import { useHistory } from "react-router-dom";

function DokkaComponentContent(props) {
    const history = useHistory();

    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if(!targetLink) return;
        const href = targetLink.getAttribute("href")
        if (!href.startsWith("http")) {
            e.preventDefault();
            history.push(href);
        }
    };

    const node = useRef(null);

    useEffect(() => {
        console.log(!!node)
        console.log(!!node.current)
        if (node.current && node.current) {
            const setupHelper = new SetupHelper(node.current)
            setupHelper.setup()
        }
    })

    return (
        <div ref={node}>
            <div 
                onClick={contentClickHandler}
                dangerouslySetInnerHTML={{__html: props.dokkaHTML}}
            />
            <style type="text/css">{styleStyle}</style>
            <style type="text/css">{mainStyle}</style>
            <style type="text/css">{prismStyle}</style>
        </div>
    )
}

export default function DokkaComponent(props) {

    return (
        <root.div>
            <DokkaComponentContent dokkaHTML={props.dokkaHTML}/>
        </root.div>
    )
}