import com.thoughtworks.gauge.Step
import java.net.HttpURLConnection
import java.net.URI
import org.json.JSONObject
import com.thoughtworks.gauge.datastore.ScenarioDataStore
import org.json.JSONArray
import kotlin.test.assertEquals

class CommonStep {
    @Step("Hoge")
    fun sampleStep() {
        println("Hello world!")
    }

    @Step("URL<url>にGETリクエストを送る")
    fun URLにGETリクエストを送る(url: String){
        val urlObj = URI.create(url).toURL()
        val connection = urlObj.openConnection() as HttpURLConnection

        connection.connectTimeout = 20_000 // 20 sec
        connection.readTimeout = 20_000    // 20 sec
        connection.requestMethod = "GET"   // GET Method
        connection.connect()

        val response = connection.inputStream.bufferedReader(Charsets.UTF_8).use {
            it.readLines().joinToString("")
        }

        val json = JSONObject(response)
        val status = connection.responseCode

        ScenarioDataStore.put("json", json)
        ScenarioDataStore.put("status", status)
    }

    @Step("レスポンスのステータスコードが<status>である")
    fun レスポンスのステータスコードがstatusである(status: Int) {
        val responseStatus = ScenarioDataStore.get("status")
        assertEquals(status, responseStatus)
    }

    @Step("レスポンスのJsonBodyの<key>が文字列の<value>である")
    fun レスポンスのJsonBodyのkeyが文字列のvalueである (key: String, value: String) {
        val responseJson = ScenarioDataStore.get("json")
        val valueOfKey = extractJson(responseJson, key)
        assertEquals(value, valueOfKey)
    }

    private fun extractJson(json: Any?, path: String): Any? {
        val parts = path.split(Regex("""[\.\[\]\'\"]""")).filter { it.isNotEmpty() }

        var value = json

        for (it in parts){
            if(json == null) return null

            value = when(value) {
                is JSONObject -> {
                    if (value.has(it)) value.get(it) else return null
                }
                is JSONArray -> {
                    val index = it.toIntOrNull() ?: return null
                    if (index in 0 until value.length()) value.get(index) else return null
                }
                else -> return null
            }
        }

        return value
    }
}