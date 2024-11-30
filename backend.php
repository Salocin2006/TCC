<?php
header("Content-Type: application/json; charset=UTF-8");

// Configuração do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "receitas";

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die(json_encode(["error" => "Falha na conexão com o banco de dados: " . $conn->connect_error]));
}

// Receber os dados enviados via POST
$data = json_decode(file_get_contents("php://input"), true);
$ingredientes = isset($data['ingredientes']) ? $data['ingredientes'] : "";

if (!$ingredientes) {
    echo json_encode(["error" => "Nenhum ingrediente fornecido"]);
    exit;
}

// Preparar a consulta SQL para buscar receitas
$sql = "SELECT * FROM recipes WHERE ingredientes LIKE ?";
$stmt = $conn->prepare($sql);
$param = "%" . $ingredientes . "%";
$stmt->bind_param("s", $param);

// Executar a consulta
$stmt->execute();
$result = $stmt->get_result();

$receitas = [];
while ($row = $result->fetch_assoc()) {
    $receitas[] = $row;
}

// Retornar as receitas em formato JSON
echo json_encode($receitas);

$stmt->close();
$conn->close();
?>
