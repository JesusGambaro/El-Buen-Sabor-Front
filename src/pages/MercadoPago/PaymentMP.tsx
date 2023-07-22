import { initMercadoPago } from "@mercadopago/sdk-react";
import { Payment } from "@mercadopago/sdk-react";
export default function PaymentMP({ prefId }: { prefId: string }) {
  initMercadoPago("TEST-f9a81470-5f5f-467c-85fe-e3d799f97788", {
    locale: "es-AR",
  });

  const initialization = {
    amount: 1,
    preferenceId: prefId,
  };
  const customization = {
    paymentMethods: {
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };
  const onSubmit = async ({
    selectedPaymentMethod,
    formData,
  }: {
    selectedPaymentMethod: any;
    formData: any;
  }): Promise<void> => {
    console.log("PaymentMP");
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise<void>((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          //else, redirect to order detail
          /* dispatch(resetOrderDetails()); */ //the reset of the orderdetails has to be after the payment is successfull
          console.log("PaymentMP resolve");
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          //if error in payment or anything, redirect to cart and throw error
          console.log("PaymentMP reject");
          reject();
        });
    });
  };
  const onError = async (error: any) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  return (
    <Payment
      initialization={initialization}
      customization={customization as any}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
}
