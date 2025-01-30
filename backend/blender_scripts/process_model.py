import bpy
import sys

def refine_model(input_path, output_path):
    # Import the generated model
    bpy.ops.import_scene.obj(filepath=input_path)

    # Add a point light for better visualization
    bpy.ops.object.light_add(type='POINT', radius=1, location=(5, 5, 5))

    # Export the refined model as GLTF
    bpy.ops.export_scene.gltf(filepath=output_path)

# Get file paths from arguments passed by subprocess
input_path = sys.argv[-2]
output_path = sys.argv[-1]

refine_model(input_path, output_path)
