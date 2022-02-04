var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const expect = std.testing.expect;"},
{"lineNum":"   20","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   21","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   22","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   23","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   24","line":"const Node = node.Node;"},
{"lineNum":"   25","line":"const NodeType = node.NodeType;"},
{"lineNum":"   26","line":"const makeNode = node.makeNode;"},
{"lineNum":"   27","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   28","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   29","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   30","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   31","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   32","line":"const OpError = @import(\"../errors/op_error.zig\").OpError;"},
{"lineNum":"   33","line":"const AssignError = @import(\"../errors/assign_error.zig\").AssignError;"},
{"lineNum":"   34","line":"const GenericError = @import(\"../errors/generic_error.zig\").GenericError;"},
{"lineNum":"   35","line":"const TypeError = @import(\"../errors/type_error.zig\").TypeError;"},
{"lineNum":"   36","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   37","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   38","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   39","line":"const inferPrimaryExprType = @import(\"primary.zig\").inferPrimaryExprType;"},
{"lineNum":"   40","line":"const inferIdentType = @import(\"ident.zig\").inferIdentType;"},
{"lineNum":"   41","line":"const inferUnaryOpType = @import(\"unary_op.zig\").inferUnaryOpType;"},
{"lineNum":"   42","line":"const inferBinaryOpType = @import(\"binary_op.zig\").inferBinaryOpType;"},
{"lineNum":"   43","line":"const inferTernaryType = @import(\"ternary.zig\").inferTernaryType;"},
{"lineNum":"   44","line":"const inferCallType = @import(\"call.zig\").inferCallType;"},
{"lineNum":"   45","line":"const inferArrayType = @import(\"array.zig\").inferArrayType;"},
{"lineNum":"   46","line":"const inferArrayAccessType = @import(\"array_access.zig\").inferArrayAccessType;"},
{"lineNum":"   47","line":"const inferDotType = @import(\"dot.zig\").inferDotType;"},
{"lineNum":"   48","line":"const inferObjectType = @import(\"object.zig\").inferObjectType;"},
{"lineNum":"   49","line":"const inferNewType = @import(\"new.zig\").inferNewType;"},
{"lineNum":"   50","line":"const allocate = @import(\"../../common/allocate.zig\");"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"pub fn inferExprType(","class":"lineCov","hits":"1","order":"3227","possible_hits":"1",},
{"lineNum":"   53","line":"    cmp: *Compiler,"},
{"lineNum":"   54","line":"    nd: Node,"},
{"lineNum":"   55","line":"    ctx: *const InferContext,"},
{"lineNum":"   56","line":") InferResult {"},
{"lineNum":"   57","line":"    return switch (nd.data) {","class":"lineCov","hits":"17","order":"3228","possible_hits":"17",},
{"lineNum":"   58","line":"        .Int => inferPrimaryExprType(nd, cmp.typebook.getNumber()),","class":"lineCov","hits":"1","order":"3229","possible_hits":"1",},
{"lineNum":"   59","line":"        .Float => inferPrimaryExprType(nd, cmp.typebook.getNumber()),","class":"lineCov","hits":"1","order":"6656","possible_hits":"1",},
{"lineNum":"   60","line":"        .String,"},
{"lineNum":"   61","line":"        .Template,"},
{"lineNum":"   62","line":"        => inferPrimaryExprType(nd, cmp.typebook.getString()),","class":"lineCov","hits":"1","order":"4993","possible_hits":"1",},
{"lineNum":"   63","line":"        .True,"},
{"lineNum":"   64","line":"        .False,"},
{"lineNum":"   65","line":"        => inferPrimaryExprType(nd, cmp.typebook.getBoolean()),","class":"lineCov","hits":"1","order":"4957","possible_hits":"1",},
{"lineNum":"   66","line":"        .Null => inferPrimaryExprType(nd, cmp.typebook.getNull()),","class":"lineCov","hits":"1","order":"5217","possible_hits":"1",},
{"lineNum":"   67","line":"        .Undefined => inferPrimaryExprType(nd, cmp.typebook.getUndefined()),","class":"lineCov","hits":"1","order":"5218","possible_hits":"1",},
{"lineNum":"   68","line":"        .Ident => |ident| inferIdentType(cmp, nd, ident),","class":"lineCov","hits":"1","order":"4938","possible_hits":"1",},
{"lineNum":"   69","line":"        .PrefixOp,"},
{"lineNum":"   70","line":"        .PostfixOp,"},
{"lineNum":"   71","line":"        => |op| inferUnaryOpType(cmp, nd, ctx, op),","class":"lineCov","hits":"1","order":"4980","possible_hits":"1",},
{"lineNum":"   72","line":"        .BinaryOp => |op| inferBinaryOpType(cmp, nd, ctx, op),","class":"lineCov","hits":"1","order":"4934","possible_hits":"1",},
{"lineNum":"   73","line":"        .Ternary => |trn| inferTernaryType(cmp, nd, ctx, trn),","class":"lineCov","hits":"1","order":"5024","possible_hits":"1",},
{"lineNum":"   74","line":"        .Call => |call| inferCallType(cmp, nd, ctx, call),","class":"lineCov","hits":"1","order":"5048","possible_hits":"1",},
{"lineNum":"   75","line":"        .Array => |arr| inferArrayType(cmp, nd, ctx, arr),","class":"lineCov","hits":"1","order":"6844","possible_hits":"1",},
{"lineNum":"   76","line":"        .ArrayAccess => |access| inferArrayAccessType(cmp, nd, ctx, access),","class":"lineCov","hits":"1","order":"6910","possible_hits":"1",},
{"lineNum":"   77","line":"        .Dot => |dot| inferDotType(cmp, nd, ctx, dot),","class":"lineCov","hits":"1","order":"6936","possible_hits":"1",},
{"lineNum":"   78","line":"        .Object => |obj| inferObjectType(cmp, nd, ctx, obj),","class":"lineCov","hits":"1","order":"7000","possible_hits":"1",},
{"lineNum":"   79","line":"        .New => |new| inferNewType(cmp, nd, ctx, new),","class":"lineCov","hits":"1","order":"7045","possible_hits":"1",},
{"lineNum":"   80","line":"        else => std.debug.panic(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"            \"Unhandled node type in inferExprType: {?}\\n\","},
{"lineNum":"   82","line":"            .{nd.getType()},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"        ),"},
{"lineNum":"   84","line":"    };"},
{"lineNum":"   85","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-04 07:51:54", "instrumented" : 20, "covered" : 18,};
var merged_data = [];
