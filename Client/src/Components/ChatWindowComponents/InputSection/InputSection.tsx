import './InputSection.css'
import sendbtn from '../../../assets/icons8-send-button-100.png'
import filepicer from '../../../assets/icons8-add-file-50.png'
const InputSection = () => {
  return (
    <div className='input-section-container'>
         <div className="media-picker"> 
         <img src={filepicer} alt='mediapicker' />
         </div>
         <div className="input-box">
          <textarea name="" id="" ></textarea>
         </div>
         <div className="send-btn">
          <button><img src={sendbtn} alt="send" /></button>
         </div>
    </div>
  )
}

export default InputSection
