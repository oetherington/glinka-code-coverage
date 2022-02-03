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
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   21","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   22","line":"const OpError = @import(\"../errors/op_error.zig\").OpError;"},
{"lineNum":"   23","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   24","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   25","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   26","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   27","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"pub fn inferUnaryOpType(","class":"lineCov","hits":"1","order":"4981","possible_hits":"1",},
{"lineNum":"   30","line":"    cmp: *Compiler,"},
{"lineNum":"   31","line":"    nd: node.Node,"},
{"lineNum":"   32","line":"    ctx: *const InferContext,"},
{"lineNum":"   33","line":"    op: node.UnaryOp,"},
{"lineNum":"   34","line":") InferResult {"},
{"lineNum":"   35","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"4982","possible_hits":"1",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    const expr = switch (inferExprType(cmp, op.expr, &subCtx)) {","class":"linePartCov","hits":"1","order":"4983","possible_hits":"2",},
{"lineNum":"   38","line":"        .Success => |res| res,","class":"lineCov","hits":"1","order":"4984","possible_hits":"1",},
{"lineNum":"   39","line":"        .Error => |err| return InferResult.err(err),","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    };"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    const entry = cmp.typebook.getOpEntry(op.op);","class":"lineCov","hits":"1","order":"4985","possible_hits":"1",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    // We assume it\'s unary, otherwise the Node wouldn\'t have parsed"},
{"lineNum":"   45","line":"    std.debug.assert(entry == null or entry.?.getType() == .Unary);","class":"linePartCov","hits":"1","order":"4986","possible_hits":"2",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    if (entry == null or !expr.isAssignableTo(entry.?.Unary.input)) {","class":"linePartCov","hits":"2","order":"4987","possible_hits":"3",},
{"lineNum":"   48","line":"        return InferResult.err(CompileError.opError(OpError.new(","class":"lineCov","hits":"1","order":"4997","possible_hits":"1",},
{"lineNum":"   49","line":"            nd.csr,","class":"lineCov","hits":"1","order":"4994","possible_hits":"1",},
{"lineNum":"   50","line":"            op.op,","class":"lineCov","hits":"1","order":"4995","possible_hits":"1",},
{"lineNum":"   51","line":"            expr,","class":"lineCov","hits":"1","order":"4996","possible_hits":"1",},
{"lineNum":"   52","line":"        )));"},
{"lineNum":"   53","line":"    }"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    nd.ty = if (entry.?.Unary.output) |out| out else expr;","class":"linePartCov","hits":"1","order":"4988","possible_hits":"2",},
{"lineNum":"   56","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"1","order":"4989","possible_hits":"2",},
{"lineNum":"   57","line":"}"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"test \"can infer type of unary op expressions\" {","class":"lineCov","hits":"3","order":"6684","possible_hits":"3",},
{"lineNum":"   60","line":"    const int = node.makeNode(","class":"lineCov","hits":"1","order":"6686","possible_hits":"1",},
{"lineNum":"   61","line":"        std.testing.allocator,"},
{"lineNum":"   62","line":"        Cursor.new(0, 0),","class":"lineCov","hits":"1","order":"6685","possible_hits":"1",},
{"lineNum":"   63","line":"        .Int,"},
{"lineNum":"   64","line":"        \"3\","},
{"lineNum":"   65","line":"    );"},
{"lineNum":"   66","line":"    defer std.testing.allocator.destroy(int);","class":"linePartCov","hits":"1","order":"6691","possible_hits":"2",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"6690","possible_hits":"2",},
{"lineNum":"   69","line":"        .expectedTy = .Number,"},
{"lineNum":"   70","line":"    }).run(.PrefixOp, node.UnaryOp{","class":"lineCov","hits":"1","order":"6689","possible_hits":"1",},
{"lineNum":"   71","line":"        .op = .Inc,","class":"lineCov","hits":"1","order":"6688","possible_hits":"1",},
{"lineNum":"   72","line":"        .expr = int,","class":"lineCov","hits":"1","order":"6687","possible_hits":"1",},
{"lineNum":"   73","line":"    });"},
{"lineNum":"   74","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 20:55:46", "instrumented" : 22, "covered" : 21,};
var merged_data = [];
