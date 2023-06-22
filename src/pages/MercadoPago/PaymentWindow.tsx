import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PaymentMP from './PaymentMP';

function PaymentWindow({ prefId }: { prefId: string }) {
    useEffect(() => {
        console.log("PaymentWindow");
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            ReactDOM.render(<PaymentMP prefId={prefId} />, newWindow.document.body);
        }
    }, [prefId]);

    return null;
}

export default PaymentWindow;
