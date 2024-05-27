import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';


function Searchingfilter({css,onInputChange}) {

  const [searchingtype , setsearchingtype] = useState('書名');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.trim().split(' ');
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };


  return (
    <>
      <InputGroup >   
        <DropdownButton
        variant={css}
        title={searchingtype}
        id="input-group-dropdown-1"
        >    
            <Dropdown.Item onClick={() => setsearchingtype("書名")}>書名</Dropdown.Item>
            <Dropdown.Item onClick={() => setsearchingtype("活動代碼")}>活動代碼</Dropdown.Item>
            <Dropdown.Item onClick={() => setsearchingtype("作者")}>作者</Dropdown.Item>

        </DropdownButton>

        <FloatingLabel
            controlId="floatingInput"
            label={`以${searchingtype}搜尋...`}
        >
        <Form.Control 
          placeholder=""  
          value={inputValue} 
          onChange={handleInputChange}  
        />

        </FloatingLabel>

      </InputGroup>
    
    </>
  )
}

export default Searchingfilter
