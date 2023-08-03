/* eslint-disable */
import './index.css'

const TransactionItem = props => {
  const {eachObject, onClickDeleteButton} = props
  const {id, title, amount, type} = eachObject

  const onDeleteHistoryItem = () => {
    onClickDeleteButton(id)
  }

  return (
    <li className="transaction-item-bg-container">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button data-testid="delete" onClick={onDeleteHistoryItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete-icon"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
