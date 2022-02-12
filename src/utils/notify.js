import { toast } from "react-toastify";
import { FiCheckCircle } from 'react-icons/fi'
import { TiWarning } from 'react-icons/ti'

const notify = (title, content, type) => {
  const Msg = () => (
    <div className="d-flex align-items-center">
      {type === "success" && <FiCheckCircle className="cl-green toast-icon-size me-3" />}
      {type === "warning" && <TiWarning className="cl-red toast-icon-size me-3" />}
      {type === "info" && <img src="assets/img/icons/power.png" alt="power" className="cl-green toast-icon-size me-3" />}

      <div>
        {type === "success" && <p className="cl-green-gd mb-0 fw-bold">{title}</p>}
        {type === "warning" && <p className="cl-red-gd mb-0 fw-bold">{title}</p>}
        {type === "info" && <p className="cl-orange-gd mb-0 fw-bold">{title}</p>}

        <p className="cl-white-80 mb-0 mt-2">{content}</p>
      </div>
    </div>
  )

  if (type === "success") {
    return toast(<Msg />, {
      className: 'notify-success'
    })
  } else if (type === "warning") {
    return toast(<Msg />, {
      className: 'notify-warning'
    })
  } else if (type === "info") {
    return toast(<Msg />, {
      className: 'notify-info'
    })
  }
}

export default notify;