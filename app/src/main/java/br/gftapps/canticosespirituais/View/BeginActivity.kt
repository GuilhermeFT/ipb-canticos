package br.gftapps.canticosespirituais.View

import android.content.Intent
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Shader
import android.graphics.Shader.TileMode
import android.os.Bundle
import android.os.Handler
import android.view.animation.AlphaAnimation
import android.view.animation.DecelerateInterpolator
import androidx.appcompat.app.AppCompatActivity
import br.gftapps.canticosespirituais.R
import kotlinx.android.synthetic.main.activity_begin.*


class BeginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_begin)
        val fadeIn = AlphaAnimation(0f, 1f)
        fadeIn.interpolator = DecelerateInterpolator() //add this
        fadeIn.duration = 1000

        iv_logo.animation = fadeIn
        tv_title.animation = fadeIn
        tv_title.setTextColor(Color.parseColor("#5C5C5C"))
        tv_title.paint.shader = LinearGradient(
            0f,0f,0f,0f,
            Color.parseColor("#5C5C5C"), Color.parseColor("#000000"), TileMode.CLAMP
        )
        tv_description.animation = fadeIn
        tv_description.setTextColor(Color.parseColor("#5C5C5C"))
        tv_description.paint.shader = LinearGradient(
            0f,0f,0f,0f,
            Color.parseColor("#5C5C5C"), Color.parseColor("#000000"), TileMode.CLAMP
        )

        Handler().postDelayed({
            val m = MainActivity()
            startActivity(Intent(applicationContext, m::class.java))
            finish()
        }, 2500)
    }
}
