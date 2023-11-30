import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button
} from '@material-ui/core';
import '../../css/PremiumLawyer.css';

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
        ]
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
        ]
    }
];

const commonFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.commonFeatures))
);

export default function PremiumLawyers() {
    return (
        <div className="custom-body">
            <header className="custom-header">
                <h1 className="custom-title">رشد کسب و کار خود را با تبلیغات هدفمند آنلاین افزایش دهید</h1>
                <p className="custom-subtitle">بین برنامه های روزانه یا هفتگی انتخاب کنید تا با مشتریان جدید ارتباط برقرار کنید.</p>
            </header>

            <div className="custom-container">
                <div className="custom-plans">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} commonFeatures={commonFeatures} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PlanCard({ plan, commonFeatures }) {
    return (
        <Card className="custom-plan-card">
            <CardHeader title={plan.name} />
            <CardContent>
                <div className="custom-price">
                    <span className="amount">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                </div>
                <p><strong>{plan.description}</strong></p>
                <ul className="custom-features">
                    {plan
                        .commonFeatures.map((feature, index) => (
                            <li key={index}>
                                <span className="custom-bullet">&#8226;</span> {feature}
                            </li>
                        ))}
                </ul>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" className="custom-button">
                    انتخاب
                </Button>
            </CardActions>
        </Card>
    );
}
