import com.thoughtworks.gauge.BeforeSpec
import org.dbunit.JdbcDatabaseTester
import org.dbunit.database.DatabaseConfig
import org.dbunit.dataset.csv.CsvURLDataSet
import org.dbunit.ext.postgresql.PostgresqlDataTypeFactory
import org.dbunit.operation.DatabaseOperation
import java.io.File

class ExecutionHooks {
    private val connection = JdbcDatabaseTester(
        "org.postgresql.Driver",
        "jdbc:postgresql://localhost:5432/bochitabi",
        "app",
        "password",
        "bochitabi"
    ).connection.apply { this.config.setProperty(DatabaseConfig.PROPERTY_DATATYPE_FACTORY, PostgresqlDataTypeFactory()) }

    @BeforeSpec
    fun setupDb() {
        val datasetDir = File("fixtures/v1/memories/get/db/")
        val csvDataset = CsvURLDataSet(datasetDir.toURI().toURL())

        DatabaseOperation.CLEAN_INSERT.execute(connection, csvDataset)
    }
}