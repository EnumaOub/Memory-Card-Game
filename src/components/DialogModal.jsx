
export function DialogModal({ openN, name, content, callbackBtn }) {
    return (
        openN? (
            <dialog id={name} open>
                {content}
                <button className="btn-dialog" onClick={callbackBtn}>NEXT</button>
            </dialog>)
            : (
                <dialog id={name} >
                    {content}
                    <button className="btn-dialog" onClick={callbackBtn}>NEXT</button>
                </dialog>

            )
        
    )
} 