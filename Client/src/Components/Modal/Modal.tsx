import './Modal.css'

const Modal = ({content,closeFnc ,headding}) => {
  return (
    <div className='modal-container'>
        <div className="modal-content">
          <div className='modal-ss'>
            <div className="modal-hedding">
              <p>{headding}</p>
              <button className='modal-close-btn' onClick={()=>closeFnc(false)}>X</button>
            </div>
            {content}
          </div>
        </div>
      
    </div>
  )
}

export default Modal
