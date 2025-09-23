package br.gftapps.canticosespirituais.Model

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Filter
import br.gftapps.canticosespirituais.Controller.Musica
import br.gftapps.canticosespirituais.R
import kotlinx.android.synthetic.main.type_list.view.*
import kotlin.collections.ArrayList

class ListMusicAdapter(context: Context, listMusic: ArrayList<Musica>) : ArrayAdapter<Musica>(context, 0, listMusic) {

    private lateinit var view: View
    private val musicList = ArrayList(listMusic)
    private lateinit var musica: Musica
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        musica = this!!.getItem(position)!!
        view = LayoutInflater.from(context).inflate(R.layout.type_list, null)

        view.tv_title.text = musica.titulo
        view.tv_number.text = musica.indice.toString() + "."
        view.tv_lirycs.text = musica.letra
        return view
    }

    override fun getFilter(): Filter {
        return object : Filter() {
            override fun performFiltering(p0: CharSequence?): FilterResults {
                var fr = FilterResults()
                if ((p0 == null) or (p0!!.isEmpty())) {
                    fr.values = musicList
                    fr.count = musicList.size
                } else {
                    var list = ArrayList<Musica>()
                    var check = false
                    try {
                        p0.toString().toInt()
                        check = true
                    } catch (e: Exception) {
                        e.printStackTrace()
                    }
                    if (check) {
                        for (m: Musica in musicList) {
                            if (m.indice.toString().toInt() == p0.toString().toInt()) {
                                list.add(m)
                            }
                        }
                    } else {
                        for (m: Musica in musicList) {
                            if ((m.titulo!!.toLowerCase().contains(p0.toString().toLowerCase().trim()))
                                or (m.letra!!.toLowerCase().contains(p0.toString().toLowerCase().trim()))) {
                                list.add(m)
                            }
                        }
                    }
                    fr.values = list
                    fr.count = list.size
                }
                return fr
            }

            override fun publishResults(p0: CharSequence?, p1: FilterResults?) {
                clear()
                addAll(p1!!.values as ArrayList<Musica>)
                notifyDataSetChanged()
            }

        }
    }
}