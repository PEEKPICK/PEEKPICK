package com.vvs.peekpick.peek.service;

public class DistanceCalService {
    private static final int EARTH_RADIUS = 6371; // Radius in kilometers

    public static double calculateDistance(double startLong, double startLat, double endLong, double endLat) {
        double dLat = Math.toRadians(endLat - startLat);
        double dLong = Math.toRadians(endLong - startLong);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(startLat)) * Math.cos(Math.toRadians(endLat))
                * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }
//    public static void main(String[] args) {
//        double startLat = 38.1155;  // Example coordinates
//        double startLong = 13.3615;
//        double endLat = 40.730610;
//        double endLong = -73.935242;
//
//        double distance = calculateDistance(startLat, startLong, endLat, endLong);
//        System.out.println("Distance between the two points: " + distance + " kilometers");
//    }
}
