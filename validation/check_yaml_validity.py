import yaml
import jsonschema
from jsonschema import validate

with open('../public/papers.yaml', 'r', encoding='utf-8') as f:
    yaml_data = yaml.safe_load(f)

with open('../public/paper_schema.yaml', 'r', encoding='utf-8') as f:
    schema = yaml.safe_load(f)

try:
    validate(instance=yaml_data, schema=schema)
    print("Validation successful")
except jsonschema.exceptions.ValidationError as e:
    print(e)
