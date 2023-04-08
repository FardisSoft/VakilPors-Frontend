import { useState, useEffect } from 'react';
import Search from './Search';
import { getAlllawyer } from "../../services/userService"
import ShowLawyers from './ShowLawyers';
import { LawyerContext } from '../../context/LawyerContext';
import { Link } from 'react-router-dom';


const Main = () => {

    const [lawyerdetail, setlawyerdetail] = useState([]);
    const [filteredLawyers, setFilteredLawyers] = useState([]);
    const [LawyerQuery, setLawyerQuery] = useState({ text: "" });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: Lawyerdata } = await getAlllawyer();
                setlawyerdetail(Lawyerdata);
                setFilteredLawyers(Lawyerdata);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, []);

    const LawyerSearch = (event) => {
        setLawyerQuery({ ...LawyerQuery, text: event.target.value });
        const allLawyers = lawyerdetail.filter((Lawyer) => {
            return Lawyer.fullname
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        setFilteredLawyers(allLawyers);
    };


    return (
        <>
            <LawyerContext.Provider
                value={{

                    setFilteredLawyers,
                    LawyerQuery,
                    filteredLawyers,
                    LawyerSearch,
                }}>

            </LawyerContext.Provider>
            <Search />
            <>
                <section className="container">
                    <div className="row">
                        {filteredLawyers.length > 0 && (
                            <ul>
                                {filteredLawyers.map(Lawyer => (
                                    <ShowLawyers Lawyer={Lawyer} />
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </>
        </>
    );
};

export default Main;
