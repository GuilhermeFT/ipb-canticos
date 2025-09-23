package br.gftapps.canticosespirituais.View

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.AdapterView
import br.gftapps.canticosespirituais.Model.GetAssetsMusic
import br.gftapps.canticosespirituais.Model.ListMusicAdapter
import br.gftapps.canticosespirituais.Controller.Musica
import br.gftapps.canticosespirituais.R
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONObject
import kotlin.collections.ArrayList

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val fjo = JSONObject(GetAssetsMusic().getFile(applicationContext, "canticos.json"))
        val fjNome = fjo.getJSONArray("nomes")
        val fjLetra = fjo.getJSONArray("letras")
        val listMusic = ArrayList<Musica>()
        var m: Musica

        for (i in 0 until fjNome.length()) {
            m = Musica()
            m.titulo = fjNome.getString(i)
            m.indice = i + 1
            m.letra = fjLetra.getString(i)
            listMusic.add(m)
        }
        val adapter = ListMusicAdapter(
            applicationContext,
            listMusic
        )
        lv_musicas.adapter = adapter

        imb_search.setOnClickListener {
            adapter.filter.filter(edt_search.text)
        }

        lv_musicas.onItemClickListener = AdapterView.OnItemClickListener { _, _, p2, _ ->
            val intent = Intent(applicationContext, ShowMusicActivity::class.java)
            intent.putExtra("index", adapter.getItem(p2)!!.indice.toString())
                .putExtra("titulo", adapter.getItem(p2)!!.titulo)
                .putExtra("letra", adapter.getItem(p2)!!.letra)

            startActivity(intent)
        }

        edt_search.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {

            }

            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {

            }

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                adapter.filter.filter(edt_search.text)
            }
        })
    }
}
