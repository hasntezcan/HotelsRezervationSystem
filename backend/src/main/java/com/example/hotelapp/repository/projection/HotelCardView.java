package com.example.hotelapp.repository.projection;

import java.math.BigDecimal;


public interface HotelCardView {
    Long         getHotelId();
    String       getName();
    String       getCity();
    String       getCountry();
    String       getPrimaryImageUrl();
    BigDecimal   getMinPrice();
    Double       getAvgRating();
    String       getAmenities();   // CSV, birazdan split’le listeye çevireceğiz
    Double       getLatitude();
    Double       getLongitude();
}