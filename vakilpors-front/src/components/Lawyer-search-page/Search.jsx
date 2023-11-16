import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Search.css';
import { FaEye, FaSearch } from 'react-icons/fa';

const Search = ({ LawyerSearch, LawyerQuery }) => {
  const [name, setName] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get('https://api.fardissoft.ir/Lawyer/GetAllPaged', {
        params: {
          name: name
        }
      });

      // Handle the response data here
      console.log(response.data);

      // Call the LawyerSearch function or perform any other actions with the data

    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  return (
    <>
      <div class="landing-layer home-page ">
        <div class="landing-content">
          <div class="landing-header cooperation animated fadeIn" style={{ fontFamily: "shabnam" }}>
            <h2>
              جست و جوی بهترین وکیل ، بررسی پرونده ، پیروزی در مجامع قضایی!
            </h2>
            <span>
              با بهترین هزینه ، بهترین وکلا رو مال پرونده ات کن!
            </span>
          </div>
          <div class="container">
            <div class="landing-content">
              <div class="landing-search">
                <form onSubmit={handleSearch}>
                  <input
                    dir="rtl"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="وکیلتو پیدا کن!"
                    aria-label="Search"
                    style={{ fontFamily: "shabnam" }}
                    aria-describedby="basic-addon1"
                  />
                  <button type="submit">
                    <i class="zmdi zmdi-search" style={{ position: "relative", left: "-10px" }}><FaSearch /></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;