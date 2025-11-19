import com.thoughtworks.gauge.BeforeSpec
import com.thoughtworks.gauge.ExecutionContext
import org.dbunit.JdbcDatabaseTester
import org.dbunit.database.DatabaseConfig
import org.dbunit.dataset.csv.CsvURLDataSet
import org.dbunit.ext.postgresql.PostgresqlDataTypeFactory
import org.dbunit.operation.DatabaseOperation

class ExecutionHooks {
    private val connection = JdbcDatabaseTester(
        "org.postgresql.Driver",
        "jdbc:postgresql://localhost:5432/bochitabi",
        "app",
        "password",
        "bochitabi"
    ).connection.apply { this.config.setProperty(DatabaseConfig.PROPERTY_DATATYPE_FACTORY, PostgresqlDataTypeFactory()) }

    @BeforeSpec
    fun setupDb(context: ExecutionContext) {
        val fixturesDir = context.currentSpecification.fileName
            .removePrefix(System.getProperty("user.dir") + "/specs")
            .removeSuffix(".spec")

        val datasetDir = "fixtures$fixturesDir/db"

        Thread.currentThread().contextClassLoader.getResource(datasetDir)
            ?.let { CsvURLDataSet(it) }
            ?.let { DatabaseOperation.CLEAN_INSERT.execute(connection, it) }
    }
}