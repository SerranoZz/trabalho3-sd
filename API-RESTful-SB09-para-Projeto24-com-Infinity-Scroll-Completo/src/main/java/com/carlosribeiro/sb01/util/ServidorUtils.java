package com.carlosribeiro.sb01.util;

import java.net.InetAddress;
import java.net.UnknownHostException;

//teste

public class ServidorUtils {
    public static String getServerIP() {
        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            return inetAddress.getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
            return null;
        }
    }
}
