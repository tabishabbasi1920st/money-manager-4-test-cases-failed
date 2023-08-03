/* eslint-disable */
import {Component} from 'react'
import './index.css'
import Header from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import {v4 as uuidv4} from 'uuid'

const initialHistoryList = []

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class AppContainer extends Component {
  state = {
    updatedHistoryList: initialHistoryList,
    titleInput: '',
    amountInput: '',
    typeInput: 'Income',
    balance: 0,
    income: 0,
    expense: 0,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeSelectMenu = event => {
    this.setState({typeInput: event.target.value})
  }

  onFormSubmit = event => {
    event.preventDefault()

    const {titleInput, amountInput, typeInput} = this.state

    if (typeInput === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amountInput),
        balance: prevState.balance + parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        expense: prevState.expense + parseInt(amountInput),
        balance: prevState.balance - parseInt(amountInput),
      }))
    }

    const newTransactionObject = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: typeInput,
    }

    this.setState(prevState => ({
      updatedHistoryList: [
        ...prevState.updatedHistoryList,
        newTransactionObject,
      ],
      titleInput: '',
      amountInput: '',
    }))
  }

  onClickDeleteButton = uniqueId => {
    const {updatedHistoryList} = this.state
    const deletedTransaction = updatedHistoryList.filter(
      eachObject => eachObject.id === uniqueId,
    )

    const [deleteObject] = deletedTransaction
    const {amount, type} = deleteObject

    if (type === 'Income') {
      this.setState(prevState => ({
        balance: prevState.balance - amount,
        income: prevState.income - amount,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance + amount,
        expense: prevState.expense - amount,
      }))
    }

    const updatedList = updatedHistoryList.filter(
      eachObject => eachObject.id !== uniqueId,
    )
    this.setState({updatedHistoryList: updatedList})
  }

  render() {
    const {
      updatedHistoryList,
      titleInput,
      amountInput,
      balance,
      income,
      expense,
    } = this.state

    return (
      <div className="app-container">
        {/* Header part*/}
        <Header />

        {/* money details container part */}

        <div className="money-details-container">
          <div className="informative-display-container your-balance">
            <img
              className="informative-display-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
            <div>
              <p className="your-balance-heading">Your Balance</p>
              <div className="para-rate-container">
                <p>Rs.</p>
                <p data-testid="balanceAmount" className="rs">
                  {balance}
                </p>
              </div>
            </div>
          </div>

          <div className="informative-display-container your-income">
            <img
              className="informative-display-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
              alt="income"
            />
            <div>
              <p className="your-balance-heading">Your Income</p>
              <div className="para-rate-container">
                <p>Rs.</p>
                <p data-testid="incomeAmount" className="rs">
                  {income}
                </p>
              </div>
            </div>
          </div>

          <div className="informative-display-container your-expenses">
            <img
              className="informative-display-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
            />
            <div>
              <p className="your-balance-heading">Your Expenses</p>
              <div className="para-rate-container">
                <p>Rs.</p>
                <p data-testid="expensesAmount" className="rs">
                  {expense}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction form and maintained history container */}
        <div className="transaction-and-history-container">
          <div className="transaction-container">
            <h1 className="add-transaction-heading">Add Transaction</h1>
            <form onSubmit={this.onFormSubmit}>
              <label htmlFor="titleInput">Title</label>
              <input
                value={titleInput}
                placeholder="Title"
                type="text"
                id="titleInput"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amountInput">Amount</label>
              <input
                value={amountInput}
                placeholder="Amount"
                id="amountInput"
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="selectMenu">Type</label>
              <select id="selectMenu" onChange={this.onChangeSelectMenu}>
                {transactionTypeOptions.map(eachOption => {
                  return (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.displayText}
                    >
                      {eachOption.displayText}
                    </option>
                  )
                })}
              </select>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>

          <div className="history-container">
            <h1 className="history-heading">History container</h1>
            <div className="history-header">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {updatedHistoryList.map(eachObject => (
                <TransactionItem
                  key={eachObject.id}
                  onClickDeleteButton={this.onClickDeleteButton}
                  eachObject={eachObject}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AppContainer
