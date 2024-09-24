import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div id="error-page" style={{display:"flex",justifyContent:"center", alignItems:'center', flexDirection:"column", height:"100vh"}}>
            <h1>Oops!</h1>
            <p>sorry, an unexpected error has occurred</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}