import '../../css/Search.css';
import { FaEye,FaSearch } from 'react-icons/fa';




const Search = ({ LawyerSearch, LawyerQuery }) => {


    return (
        <>
            <div class="landing-layer home-page ">
                <div class="landing-content">
                    <div class="landing-header cooperation animated fadeIn" style={{fontFamily: "shabnam"}}>
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
                                <form >
                                    <input
                                        dir="rtl"
                                        type="text"
                                        value={LawyerQuery.text}
                                        onChange={LawyerSearch}
                                        onClick={LawyerSearch}
                                        className="form-control"
                                        placeholder="وکیلتو پیدا کن!"
                                        aria-label="Search"
                                        style={{fontFamily: "shabnam"}}
                                        aria-describedby="basic-addon1"
                                    />
                                    <button>
                                        <i class="zmdi zmdi-search" style={{position :"relative", top :"-1px", left : "-3px"}}><FaSearch /></i>
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
