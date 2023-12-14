import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    CircularProgress
} from '@material-ui/core';
import '../../css/PremiumLawyer.css';
import { BASE_API_ROUTE } from "../../Constants";
import jwt from "jwt-decode";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Plan data
const plans = [
    {
        name: 'برنامه روزانه',
        price: '$10',
        period: 'در روز',
        description:
            '**هر روز با مشتریان محلی در تماس باشید.** لیست کسب و کار شما و تبلیغات شما برای 24 ساعت در سایت ما به صورت برجسته نمایش داده می شود، تا حداکثر دیده شدن را تضمین کند. از فرصت های روزانه برای جذب مشتریان جدید از دست ندهید.',
        commonFeatures: [
            'قرار دادن لیست ویژه',
            'نمایش تبلیغات در صفحات با ترافیک بالا',
            'گزارش تحلیلی از کلیک ها و تاثیرات',
            'خلاقیت های سفارشی برای تبلیغات موثر'
        ],
        planType: "silver"
    },
    {
        name: 'برنامه هفتگی',
        price: '$50',
        period: 'در هفته',
        description:
            'تبلیغات خود را با برنامه پریمیوم هفتگی ما به سطح بالاتری ببرید. با یک قیمت پایین، کسب و کار شما طول هفته برجسته خواهد شد. تبلیغات و لیست شما در نتایج جستجو و بخش های پیشنهادی اولویت دارد. بیشتر مشتریان را در طول 7 روز جذب کنید و نتایج واقعی برای کسب و کار خود ببینید.',
        commonFeatures: [
            'قرار دادن لیست ویژه',
            'نمایش تبلیغات در صفحات با ترافیک بالا',
            'گزارش تحلیلی از کلیک ها و تاثیرات',
            'خلاقیت های سفارشی برای تبلیغات موثر'
        ],
        planType: "gold"
    }
];

// API endpoint for activating a premium subscription


const PremiumLawyers = () => {
    const navigate = useNavigate();
    const { refUserRole, getAccessToken } = useAuth();
    const [loading, setLoading] = useState(false);

    // Function to show success message using toast
    const showSuccessMessage = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            rtl: true,
        });
    };

    // Function to show error message using toast
    const showErrorMessage = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            rtl: true,
        });
    };

    // Function to fetch data from various API endpoints
    const fetchData = async () => {
        const token = await getAccessToken();
        if (token) {
            const tokenData = jwt(token);
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            try {
                // const userResponse = await axios.get(`${BASE_API_ROUTE}Customer/GetUserById?userId=${tokenData.uid}`, { headers });
                // // Process userResponse.data as needed

                // const balanceResponse = await axios.get(`${BASE_API_ROUTE}Wallet/GetBalance`, { headers });
                // // Process balanceResponse.data as needed

                // const subscriptionStatusResponse = await axios.get(`${BASE_API_ROUTE}Premium/GetSubscriptionStatus`, { headers });
                // // Process subscriptionStatusResponse.data as needed

                // const transactionsResponse = await axios.get(`${BASE_API_ROUTE}Wallet/GetTransactions?PageNumber=${1}&PageSize=${5}&IsAscending=false`, { headers });
                // // Process transactionsResponse.data as needed

                // const monthlyTransactionsResponse = await axios.get(`${BASE_API_ROUTE}Wallet/GetMonthlyTransactionsAmount`, { headers });
                // // Process monthlyTransactionsResponse.data as needed

            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }
    };
    // const API_ENDPOINT = `${BASE_API_ROUTE}`;
    // Function to activate a subscription
    const activateSubscription = async (premiumPlan) => {
        setLoading(true);
        const url =
            BASE_API_ROUTE +
            `Premium/ActivateSubscription?PremiumPlan=${premiumPlan}`;
        const token = await getAccessToken();
        console.log(BASE_API_ROUTE);
        console.log(token);
        if (token) {
            try {
                const response = await axios.post(url, "", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log(`Premium plan ${premiumPlan} activated. Response:`, response.data);
                setLoading(false);

                // Show success message
                showSuccessMessage(`اشتراک ${premiumPlan} شما با موفقیت فعال شد!`);

                // Fetch updated data from the server
                fetchData();
            } catch (error) {
                console.error(`Error activating premium plan ${premiumPlan}:`, error.message);
                setLoading(false);

                // Show error message
                showErrorMessage("خطا در فعال سازی اشتراک");
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="custom-styles">
            <div className="custom-container">
                <div className="custom-plans">
                    {plans.map((plan, index) => (
                        <PlanCard
                            key={index}
                            plan={plan}
                            onSelectPlan={() => activateSubscription(plan.planType)}
                            loading={loading}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

function PlanCard({ plan, onSelectPlan, loading }) {
    return (
        <Card className="custom-plan-card">
            <CardHeader title={plan.name} />
            <CardContent>
                <div className="custom-price">
                    <span className="amount">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                </div>
                <p className="custom-description"><strong>{plan.description}</strong></p>
                <ul className="custom-features">
                    {plan.commonFeatures.map((feature, index) => (
                        <li key={index}>
                            <span className="custom-bullet">&#8226;</span> {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    className="custom-button"
                    onClick={onSelectPlan}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'انتخاب'
                    )}
                </Button>
            </CardActions>
        </Card>
    );
}

export default PremiumLawyers;
