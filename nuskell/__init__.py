##############################################
# Initiation of the nuskell compiler package #
##############################################

__version__ = "0.2.0"

# Import the main interface to the compiler #
from nuskell.compiler import translate, printCRN
from nuskell.verifier import verify
from nuskell.objects import reset_names
from nuskell.interpreter.environment import NuskellExit

