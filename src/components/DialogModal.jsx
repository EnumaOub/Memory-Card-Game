import './DialogModal.css'

export function DialogModal({ openN, name, content, callbackBtn }) {
    return (
        openN? (
            <dialog id={name} className='active' open>
                <div className="modal-content">
                    {content}
                    <button className="btn-dialog" onClick={callbackBtn}>NEXT</button>
                </div>
                
            </dialog>)
            : (
                <dialog id={name} >
                    <div className="modal-content">
                        {content}
                        <button className="btn-dialog" onClick={callbackBtn}>NEXT</button>
                    </div>
                </dialog>

            )
        
    )
} 