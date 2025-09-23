package br.gftapps.canticosespirituais.View
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.SeekBar
import br.gftapps.canticosespirituais.R
import kotlinx.android.synthetic.main.activity_show_music.*

class ShowMusicActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_show_music)
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        val s = 18f

        if (getFileStreamPath("fontChange").exists()) {
            openFileInput("fontChange").bufferedReader().use{
                sb_font_size.progress = it.readText().toInt()
            }
        }
        tv_letra.textSize = s + sb_font_size.progress

        tv_Musica.text = intent.getStringExtra("titulo")
        tv_indice.text = intent.getStringExtra("index") + "."
        tv_letra.text = intent.getStringExtra("letra")

        sb_font_size.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(p0: SeekBar?, p1: Int, p2: Boolean) {
                tv_letra.textSize = s + sb_font_size.progress
                openFileOutput("fontChange", MODE_PRIVATE).use {
                    it.write(p1.toString().toByteArray())}
            }

            override fun onStartTrackingTouch(p0: SeekBar?) {

            }

            override fun onStopTrackingTouch(p0: SeekBar?) {

            }
        })
    }

    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
