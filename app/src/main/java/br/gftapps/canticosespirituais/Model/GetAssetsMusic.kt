package br.gftapps.canticosespirituais.Model

import android.content.Context
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.lang.StringBuilder

class GetAssetsMusic {

    fun getFile(c: Context, file: String): String {
        var sb = StringBuilder()
        var input: InputStream = c.assets.open(file)
        var br = BufferedReader(InputStreamReader(input, "UTF-8"))
        var line = br.readLine()

            while (line != null) {
                sb.append(line).append("\n")
                line = br.readLine()
            }
        return sb.toString()
    }
}