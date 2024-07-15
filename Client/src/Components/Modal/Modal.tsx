import './Modal.css'

const Modal = ({content,closeFnc}) => {
  return (
    <div className='modal-container'>
        <div className="modal-content">
          <div className='modal-ss'>
            <div className="modal-hedding">
              <p>hedding</p>
              <button className='modal-close-btn' onClick={()=>closeFnc(false)}>X</button>
            </div>
            {content}
          </div>
        </div>
      
    </div>
  )
}

export default Modal
