Iniciar mongo
    mongod --port 27017 --dbpath C:\Projetos\mongodb\tcc-ifsp-backend

Cadastro dos postos
- Baixar planilha do portal https://www.anp.gov.br/postos/consulta.asp
  -   Alterar nome das colunas conforma abaixo:
        Nº Autorizacao = autorizacao
        Data Publicação DOU - Autorização = data_autorizacao
        Código Simp = codigo_simp
        Razão Social = razao_social
        CNPJ = cnpj
        ENDEREÇO = endereco
        COMPLEMENTO = complemento
        BAIRRO = bairro
        CEP = cep
        UF = uf
        Municipio = municipio
        Vinculação a Distribuidor = bandeira
        Data de Vinculação a Distribuidor = data_bandeira
- Utilizar a ferramenta http://www.convertcsv.com/csv-to-json.htm para converter de excel para json
        - Marcar opção "First row is column name"
        - Retirar do arquivo enviado a primeira linha
        - Importar arquivo JSON para o banco de dados mongodb
        
        mongoimport --db tcc-ifsp --collection Posto --file C:\Projetos\tcc-ifsp\database\json.json --jsonArray

- Atualizar preço do combustível
   - Baixar planilha no portal: http://anp.gov.br/preco/prc/resumo_ultimas_coletas_index.asp
