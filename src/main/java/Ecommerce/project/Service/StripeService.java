//package Ecommerce.project.Service;
//
//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import com.stripe.param.PaymentIntentCreateParams;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class StripeService {
//    @Value("${stripe.secret.key}")
//    private String stripeSecretKey;
//
//    @PostConstruct
//    public void init() {
//        Stripe.apiKey=stripeSecretKey;
//    }
//    public PaymentIntent createPaymentIntent(Long amount,String currency) throws StripeException {
//        PaymentIntentCreateParams params=
//                PaymentIntentCreateParams.builder()
//                        .setAmount(amount)
//                        .setCurrency(currency)
//                        .setPaymentMethod("pm_card_visa")
//                        .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.MANUAL)
//                        .build();
//        return PaymentIntent.create(params);
//    }
//}
