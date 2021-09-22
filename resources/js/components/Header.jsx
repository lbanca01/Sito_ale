import PropTypes from 'prop-types'
import Button from './Button'
import { useHistory } from "react-router-dom";

const Header = ({ setTitle, showAdd, onAdd, refreshTasks }) => {
  const history = useHistory();

  function handleChange(value) {
    setTitle(value)
    history.push(`/${value}`);
    refreshTasks()
  }

  return (
    <header className="header">
      <form>
        <select onChange={(e) => handleChange(e.target.value)}>
          <option value="travels">Posti da vedere</option>
          <option value="restourants">Ristoranti</option>
          <option value="films">Film da vedere</option>
        </select>
      </form>
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Che si fa?',
  }

Header.propTypes = {
    title: PropTypes.string.isRequired,
  }


export default Header;
