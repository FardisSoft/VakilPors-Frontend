import '../../css/Search.css';
import { FaEye, FaSearch } from 'react-icons/fa';
import MovingBar from '../premium-page/MovingBar';
import { Box } from "@material-ui/core";

const Search = ({ LawyerSearch, LawyerQuery }) => {
    const text = '...'; // Your long text here

    return (
        <>
            <MovingBar />
            <div className="landing-layer home-page">
                <div className="landing-content">
                    <Box sx={{ flexGrow: 1, padding: "20px" }}>
                        <div className="landing-header cooperation animated fadeIn" style={{ fontFamily: "shabnam" }}>
                            <h2>جست و جوی بهترین وکیل ، بررسی پرونده ، پیروزی در مجامع قضایی!</h2>
                            <span>با بهترین هزینه ، بهترین وکلا رو مال پرونده ات کن!</span>
                        </div>
                    </Box>

                    <h2>
                        جست و جوی بهترین وکیل ، بررسی پرونده ، پیروزی در مجامع قضایی!
                    </h2>
                    <span>
                        با بهترین هزینه ، بهترین وکلا رو مال پرونده ات کن!
                    </span>

                    <div className="container">
                        <div className="landing-content">
                            <div className="landing-search">
                                <form>
                                    <input
                                        dir="rtl"
                                        type="text"
                                        value={LawyerQuery.text}
                                        onChange={LawyerSearch}
                                        onClick={LawyerSearch}
                                        className="form-control"
                                        placeholder="وکیلتو پیدا کن!"
                                        aria-label="Search"
                                        style={{ fontFamily: "shabnam" }}
                                        aria-describedby="basic-addon1"
                                    />
                                    <button>
                                        <i className="zmdi zmdi-search" style={{ position: "relative", left: "-10px" }}><FaSearch /></i>
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
