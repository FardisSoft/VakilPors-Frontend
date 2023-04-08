import '../css/Search.css';
import { LawyerContext } from "../../context/LawyerContext";
import { useContext } from 'react';



const Search = () => {

    const { LawyerQuery, LawyerSearch } = useContext(LawyerContext);

    return (
        <div class="landing-layer home-page">
            <div class="container">
                <div class="landing-content">
                    <div class="landing-search">
                        <form method="get" action="/courses">
                        <input type="text" 
                        name="Search"
                        placeholder=" وکیلتو پیدا کن! " 
                        class="autocomplete" 
                        autocomplete="off" 
                        onChange={LawyerSearch} 
                        value={LawyerQuery.text}/>
                        <button>
                            <i class="zmdi zmdi-search"></i>
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Search;
